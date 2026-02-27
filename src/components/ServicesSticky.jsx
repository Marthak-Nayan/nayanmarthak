const ServicesSticky = ({ services, activeIndex, visibleItems }) => {
  return (
    <div className="services-section" id="servicesSection">
      <div className="services-sticky">
        <div className="services-container">
          {services.map((service, index) => {
            const isActive = index === activeIndex;
            const isVisible = visibleItems.includes(index);

            return (
              <div
                key={service.id}
                className={`service-item ${isVisible ? 'visible' : ''}`}
              >
                <h2 className={isActive ? 'active' : ''}>
                  {service.number} {service.title}
                </h2>
                {isActive && (
                  <p>{service.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSticky;
