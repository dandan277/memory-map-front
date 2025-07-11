import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function LoginProfilePage() {
  const location = useLocation();
  const {
    address,
    username: initUsername = "",
    age: initAge = "",
  } = location.state || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: initUsername,
      age: initAge,
    },
  });

  const username = watch("username", "");
  const age = watch("age", "");
  const onSubmit = (data) => {};
  let navigate = useNavigate();
  const isProfileValid = username && age && !errors.username && !errors.age;

  return (
    <div className="w-screen h-screen bg-Background flex flex-col">
      {/* 폼과 안내 영역 */}
      <div className="flex-1 pt-20 p-10 flex flex-col">
        <h2 className="font-bold text-3xl mb-14">정보를 입력해주세요</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-low flex">
            <p>닉네임을 알려주세요</p>
            <span className="text-[#FA6F0B] text-xl mt-[-5px] ml-1">*</span>
          </div>
          <TextInput
            placeholder="홍길동"
            name="username"
            required="닉네임 입력은 필수 입니다."
            register={register}
            maxLen={10}
            value={username}
            errors={errors}
          />
          <div className="flex-low flex mt-10">
            <p>나이를 알려주세요</p>
            <span className="text-[#FA6F0B] text-xl mt-[-5px] ml-1">*</span>
          </div>
          <TextInput
            placeholder="21"
            name="age"
            required="나이 입력은 필수 입니다."
            register={register}
            maxLen={3}
            value={age}
            errors={errors}
            type="number"
          />
        </form>
        <div className="flex justify-center">
          {isProfileValid ? ( //필드 값이 입력되면
            <div className="w-full max-w-xs mx-auto">
              <button
                className="mt-10 w-full p-5 text-center text-xl font-bold rounded-lg border-none
    text-black bg-white shadow-[inset_-8px_-8px_17px_rgba(0,0,0,0.7)]"
                onClick={() =>
                  navigate("/login/location", {
                    state: { username, age },
                  })
                }
              >
                위치 정보를 인증해주세요
              </button>
              <p className="mt-3 text-base text-white">{address}</p>
            </div>
          ) : (
            <button //필드가 입력 안되있으면
              className="mt-10 w-full max-w-xs p-5 text-center text-xl text-bold rounded-lg border-none
              bg-gray-400 shadow-[inset_-8px_-8px_17px_rgba(0,0,0,0.7)]"
            >
              위치 정보를 인증해주세요
            </button>
          )}
        </div>
      </div>
      {/* 하단 완료하기 버튼 */}
      <div className="flex justify-center mb-5">
        <div
          className={`w-full max-w-xs p-5 text-center text-xl text-bold rounded-lg border-none
          ${
            address && isProfileValid
              ? "bg-white text-black"
              : "bg-gray-400 text-white"
          } shadow-[inset_-8px_-8px_17px_rgba(0,0,0,0.7)]`}
          {...(address && isProfileValid
            ? {
                onClick: () => {
                  const accessToken = localStorage.getItem("accessToken");
                  const refreshToken = localStorage.getItem("refreshToken");
                  axios
                    .post(
                      "/api/v1/auth/sinup",
                      {
                        nickname: username,
                        age: Number(age),
                        location: address,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                          "Refresh-Token": refreshToken,
                        },
                      }
                    )
                    .then((res) => {
                      navigate("/");
                    })
                    .catch(() => {
                      alert("로그인 실패");
                    });
                },
              }
            : {})}
        >
          완료하기
        </div>
      </div>
    </div>
  );
}
