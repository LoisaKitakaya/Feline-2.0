const ButtonSpinner = () => {
  return (
    <div className="flex justify-start items-center mx-auto w-fit">
      <div className="spinner"></div>
      <div className="mx-1"></div>
      <span className="font-extra-thin">Processing...</span>
    </div>
  );
};

export default ButtonSpinner;
