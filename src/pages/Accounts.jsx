const Accounts = () => {
  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h4 className="text-2xl font-semibold">Accounts</h4>
          <button className="rounded-md border py-2 px-4" onClick={() => {}}>
            <i className="bi bi-plus-lg"></i> New Account
          </button>
        </div>
        <p className="text-lg font-thin">
          A collection of all your accounts / businesses
        </p>
      </div>
    </>
  );
};

export default Accounts;
