import useTheme from "../contexts/theme";

export default function Card() {
    const { themeMode } = useTheme();

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow p-6 text-left dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Theme Switcher
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
                Use the toggle above to switch between light and dark mode.
                The theme is shared with every component through the React Context API.
            </p>
            <span className="inline-block mt-4 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Current theme: {themeMode}
            </span>
        </div>
    );
}
