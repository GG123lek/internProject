import { CircleLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <CircleLoader color="#007bff" size={80} />
      </div>
    )
  );
};

export default Loader;
