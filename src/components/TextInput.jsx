export default function TextInput({
  placeholder = "",
  name,
  required,
  maxLen,
  register,
  value,
  errors,
  type = "text",
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required,
          maxLength: {
            value: maxLen,
            message: `최대 ${maxLen}글자까지 입력 가능합니다.`,
          },
        })}
        className="px-3 py-2 w-full bg-gray-700 border-white text-white placeholder-[#C0C0C0] focus:outline-none bg-transparent border-0 border-b"
      />
      <div className="flex-low flex justify-between">
        {errors.username ? (
          <div className="text-red-500 text-xs mt-1">{errors.username}</div>
        ) : (
          <div></div>
        )}
        <div className="text-xs text-right mt-1 text-gray-400">
          {value.length}/{maxLen}
        </div>
      </div>
    </>
  );
}
