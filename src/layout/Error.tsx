import Header from "./Header";

const Error = () => {
  return (
    <>
      <Header/>
        <div className="flex flex-col items-center justify-center py-16 min-h-[818px]">
          <div className="text-9xl font-bold py-4 text-blue-900">404</div>
          <h1 className="text-xl mb-6">Truy cập của bạn bị lỗi hoặc không tìm thấy nội dung</h1>
        </div>
    </>
  );
};

export default Error;
