import data from "./todo.json";

const KeepTabs = () => {
  const sTComplete = data.todo[0]["short-term"].filter(
    (item) => item.complete === true
  );
  const sTIncomplete = data.todo[0]["short-term"].filter(
    (item) => item.complete === false
  );

  const mTComplete = data.todo[1]["medium-term"].filter(
    (item) => item.complete === true
  );
  const mTIncomplete = data.todo[1]["medium-term"].filter(
    (item) => item.complete === false
  );

  const lTComplete = data.todo[2]["long-term"].filter(
    (item) => item.complete === true
  );
  const lTIncomplete = data.todo[2]["long-term"].filter(
    (item) => item.complete === false
  );

  return (
    <div className="flex justify-center gap-4">
      <div className="p-4 w-6/12">
        <h4 className="text-lg mb-4 text-center font-semibold border-b pb-4">
          Short term goals
        </h4>
        <div>
          <p className="underline mb-4 text-center">Incomplete</p>
          {sTIncomplete.map((item, index) => (
            <div key={index} className="flex gap-2 mb-4">
              <span>
                <input type="checkbox" className="rounded" disabled />
              </span>
              <label>{item.task}</label>
            </div>
          ))}
          <p className="underline mb-4 text-center">Completed</p>
          {sTComplete.map((item, index) => (
            <div key={index} className="flex gap-2 mb-4">
              <span>
                <input type="checkbox" className="rounded" disabled checked />
              </span>
              <label>{item.task}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 w-6/12">
        <h4 className="text-lg mb-4 text-center font-semibold border-b pb-4">
          Medium term goals
        </h4>
        <div>
          <p className="underline mb-4 text-center">Incomplete</p>
          {mTIncomplete.map((item, index) => (
            <div key={index} className="flex gap-2 mb-4">
              <span>
                <input type="checkbox" className="rounded" disabled />
              </span>
              <label>{item.task}</label>
            </div>
          ))}
          <p className="underline mb-4 text-center">Completed</p>
          {mTComplete.map((item, index) => (
            <div key={index} className="flex gap-2 mb-4">
              <span>
                <input type="checkbox" className="rounded" disabled checked />
              </span>
              <label>{item.task}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 w-6/12">
        <h4 className="text-lg mb-4 text-center font-semibold border-b pb-4">
          Long term goals
        </h4>
        <div>
          <p className="underline mb-4 text-center">Incomplete</p>
          {lTIncomplete.map((item, index) => (
            <div key={index} className="flex gap-2 mb-4">
              <span>
                <input type="checkbox" className="rounded" disabled />
              </span>
              <label>{item.task}</label>
            </div>
          ))}
          <p className="underline mb-4 text-center">Completed</p>
          {lTComplete.map((item, index) => (
            <div key={index} className="flex gap-2 mb-4">
              <span>
                <input type="checkbox" className="rounded" disabled checked />
              </span>
              <label>{item.task}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeepTabs;
