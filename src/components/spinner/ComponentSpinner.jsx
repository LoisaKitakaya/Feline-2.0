const ComponentSpinner = () => {
  return (
    <div className="flex justify-center items-center mx-auto my-36 w-fit">
      <div className="spinner"></div>
      <div className="mx-1"></div>
      <span className="font-extra-thin">Loading...</span>
    </div>
  );
};

export default ComponentSpinner;
