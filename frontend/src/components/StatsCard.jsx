const StatsCard = ({ title, value, icon, colorClass = "text-primary" }) => {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm border-0 rounded-3 h-100">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="text-muted text-uppercase small mb-0">{title}</h6>
                        {icon && <span className={`fs-4 ${colorClass}`}>{icon}</span>}
                    </div>
                    <h3 className="mb-0 fw-bold">{value}</h3>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
