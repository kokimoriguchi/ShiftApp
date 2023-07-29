const Footer = () => {
  return (
    <div className="h-auto">
      <div className="mb-5 w-full h-0.5 dark:bg-white bg-gray-500 z-[-10]"></div>
      <div className=" text-xs flex absolute left-0 right-0 justify-center opacity-70 z-[-1000]">
        <div className="flex justify-center ">
          <p className="pr-1 dark:text-white">Copyright</p>
          <p className="flex justify-center dark:text-white">&copy; 2023 km</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
