import { ChangeEvent } from "react";

const TextEditor = ({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <form>
      <div className="w-full  mb-4 mt-4">
        <div className=" flex items-center justify-between border">
          <div className=" bg-white rounded-b-lg w-full">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="block w-full px-0 text-sm text-gray-800 bg-white border-0  pl-2 focus:outline-none"
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextEditor;
