import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";
import type { Request } from "https://deno.land/std@0.168.0/http/server.ts";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const CAMPAY_WEBHOOK_KEY = Deno.env.get("CAMPAY_WEBHOOK_KEY")!;

serve(async (req: Request) => {
  try {
    if (req.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // ✅ Verify webhook key
    const incomingKey = req.headers.get("X-Campay-Webhook-Key");
    if (incomingKey !== CAMPAY_WEBHOOK_KEY) {
      console.warn("Unauthorized webhook access attempt");
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = await req.json();
    console.log("Campay webhook payload:", payload);

    const { reference, status } = payload;

    if (!reference || !status) {
      return new Response("Invalid Payload", { status: 400 });
    }

    // ✅ Match the format stored in your DB: ORDER-<timestamp>
    const externalRef = `ORDER-${reference}`;

    if (status === "SUCCESSFUL") {
      const { error } = await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("external_reference", externalRef);

      if (error) {
        console.error("Supabase update error:", error);
        return new Response("DB Update Failed", { status: 500 });
      }

      return new Response("Order updated to paid", { status: 200 });
    }

    return new Response("No action taken", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}, { jwt: false });