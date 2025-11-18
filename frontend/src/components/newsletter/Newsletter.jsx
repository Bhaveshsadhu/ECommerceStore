
const Newsletter = () => {
    return (
        <div
            className="bg-white rounded-4 shadow-sm p-4 my-5"
            style={{ border: "1px solid #e5e7eb" }}
        >
            <div className="text-center">
                <h5 className="fw-semibold mb-1">Stay in the loop</h5>
                <p className="text-muted small mb-4">
                    Get updates on new drops, deals, and tips.
                </p>

                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="d-flex flex-column flex-sm-row justify-content-center gap-2"
                    style={{ maxWidth: "450px", margin: "0 auto" }}
                >
                    <input
                        type="email"
                        className="form-control"
                        placeholder="you@example.com"
                        required
                    />

                    <button type="submit" className="btn btn-primary px-4">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
