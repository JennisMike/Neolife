// import doctorIcon from "/icons/doctor.png";
// import nutritionIcon from "/icons/nutrition.png";
// import traceabilityIcon from "/icons/traceability.png";
// import studyIcon from "/icons/study.png";
// import manufacturingIcon from "/icons/manufacturing.png";

export default function NeoLifeQuality() {
  const qualityItems = [
    {
      icon: doctorIcon,
      title: "Created by Doctors and Scientists",
    },
    {
      icon: nutritionIcon,
      title: "Whole-Food Based Cellular Nutrition",
    },
    {
      icon: traceabilityIcon,
      title: "High Quality Raw Materials and Full Traceability",
    },
    {
      icon: studyIcon,
      title: "Clinically Proven Human Clinical Studies",
    },
    {
      icon: manufacturingIcon,
      title: "High Manufacturing Standards",
    },
  ];

  return (
    <section className="bg-light py-5">
      <div className="container text-center">
        <h2 className="mb-4 fw-bold">
          How do we create the finest, safest and most effective products?
        </h2>
        <p className="mb-5 fs-5 text-muted">Here’s a start...</p>

        <div className="row justify-content-center gy-5">
          {qualityItems.map((item, index) => (
            <div className="col-md-4 col-lg-3" key={index}>
              <img
                src={item.icon}
                alt={item.title}
                className="mb-3"
                style={{ height: 64 }}
              />
              <h5 className="fw-semibold">{item.title}</h5>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <a href="/about-quality" className="btn btn-outline-success">
            Read more about the NeoLife Quality Difference
          </a>
        </div>
      </div>
    </section>
  );
}