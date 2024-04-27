const Avatar = ({
  name = "Anonymous",
  size = "small",
}: {
  name: string | "Anonymous";
  size?: "big" | "small";
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-white `}
      >
        {name[0]}
      </span>
    </div>
  );
};

export default Avatar;
