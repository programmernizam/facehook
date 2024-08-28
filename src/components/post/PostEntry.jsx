import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { actions } from "../../actions";
import AddPhotoIcon from "../../assets/icons/addPhoto.svg";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import usePost from "../../hooks/usePost";
import { useProfile } from "../../hooks/useProfile";
import Field from "../common/Field";

export default function PostEntry({ onCreate }) {
  const { auth } = useAuth();
  const { state: profile } = useProfile();
  const { dispatch } = usePost();
  const { api } = useAxios();
  const fileUploadRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = profile?.user ?? auth?.user;

  const handleImageUpload = (event) => {
    event.preventDefault();
    fileUploadRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 
      setImagePreview(imageUrl)
    }
  };

  const handlePostSubmit = async (data) => {
    const formData = new FormData();

    formData.append("content", data.content);

    if (fileUploadRef.current.files.length > 0) {
      for (const file of fileUploadRef.current.files) {
        formData.append("image", file);
      }
    }

    dispatch({
      type: actions.post.DATA_FETCHING,
    });
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        dispatch({ type: actions.post.DATA_CREATED, data: response.data });
        onCreate();
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: error.message });
    }
  };
  return (
    <div className="card relative mt-5">
      <h6 className="mb-3 text-center text-lg font-bold lg:text-xl">
        Create Post
      </h6>

      <form onSubmit={handleSubmit(handlePostSubmit)}>
        <div className="mb-3 flex items-center justify-between gap-2 lg:mb-6 lg:gap-4">
          <div className="flex items-center gap-3">
            <img
              className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${user?.avatar}`}
              alt="avatar"
            />
            <div>
              <h6 className="text-lg lg:text-xl">
                {user?.firstName} {user?.lastName}
              </h6>

              <span className="text-sm text-gray-400 lg:text-base">Public</span>
            </div>
          </div>

          <label
            className="btn-primary cursor-pointer !text-gray-100"
            htmlFor="photo"
            onClick={handleImageUpload}
          >
            <img src={AddPhotoIcon} alt="Add Photo" />
            Add Photo
          </label>
          <input
            type="file"
            name="photo"
            id="photo"
            className="hidden"
            ref={fileUploadRef}
            onChange={handleFileChange}
          />
        </div>
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}
        {/* <!-- Post Text Input --> */}

        <Field label="" error={errors.content}>
          <textarea
            {...register("content", {
              required: "Adding some text mandatory!",
            })}
            name="content"
            id="content"
            placeholder="Share your thoughts..."
            className="h-[120px] w-full bg-transparent focus:outline-none lg:h-[160px]"
          ></textarea>
        </Field>
        <div className="border-t border-[#3F3F3F] pt-4 lg:pt-6">
          <button
            className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
