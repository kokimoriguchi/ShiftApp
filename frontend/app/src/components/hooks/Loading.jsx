const Loading = () => {
  return (
    <div className="h-auto min-h-[430px] sm:min-h-[650px] bg-sky-100 dark:bg-black">
      <div
        className="flex flex-col sm:pt-72 pt-52 items-center justify-center"
        aria-label="読み込み中"
      >
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="pt-2 font-mono dark:text-white">loading...</p>
      </div>
    </div>
  );
};

export default Loading;
