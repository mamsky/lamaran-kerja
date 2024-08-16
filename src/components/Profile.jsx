const Profile = () => {
  return (
    <div className="w-80 py-10">
      <div className="border rounded-xl ml-10 flex flex-col items-center py-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://i.pinimg.com/originals/fa/e8/62/fae862fff4f6100d000a1c01c4030db0.jpg"
          alt="Paste Prosmana"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Paste Prosmana
        </h5>
        <span className="text-sm text-gray-500 ">Full Stack Developer</span>
        <div className="flex mt-4 md:mt-6">
          <a
            href="https://discord.com/channels/@me"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Discord
          </a>
          <a
            href="https://api.whatsapp.com/send/?phone="
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-green-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Whatsapp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
