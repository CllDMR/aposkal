export default function Layout({ children }) {
  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6 ">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md ">
              {children}
            </div>
          </div>
          <div className="mt-5 sm:mt-0 md:col-span-1">
            <div className="px-4 sm:px-0">
              <>
                <h3 className="text-lg font-medium leading-6 text-gray-900 ">
                  Kulanıcı Düzenle
                </h3>
                <p className="mt-5 text-sm text-gray-600">
                  Kullanıcı bilgilerini düzenleyebilirsiniz.
                </p>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
