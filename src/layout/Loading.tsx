const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-16 h-16">
                <div
                    className="w-12 h-12 border-4 border-gray-200 border-t-black border-solid rounded-full animate-spin"
                    style={{animationDuration: '2s'}}
                ></div>
            </div>
        </div>
    );
};

export default Loading;