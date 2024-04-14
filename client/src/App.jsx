import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    AddReview,
    Stats,
    AllReviews,
    Profile,
    Admin,
    EditReviews,
} from './pages';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addReviewAction } from './pages/AddReview';
import { loader as allReviewsLoader } from './pages/AllReviews';
import { loader as editReviewsLoader } from './pages/EditReviews';
import { action as editReviewsAction } from './pages/EditReviews.jsx';
import { action as deleteReviewsAction } from './pages/DeleteReview';
import { loader as adminLoader } from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';
import ErrorElement from './components/ErrorElement';

export const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
};

checkDefaultTheme();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
        },
    },
});

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: 'register',
                element: <Register />,
                action: registerAction,
            },
            {
                path: 'login',
                element: <Login />,
                action: loginAction(queryClient),
            },
            {
                path: 'dashboard',
                element: <DashboardLayout queryClient={queryClient} />,
                loader: dashboardLoader(queryClient),
                children: [
                    {
                        index: true,
                        element: <AddReview />,
                        action: addReviewAction(queryClient),
                    },
                    {
                        path: 'stats',
                        element: <Stats />,
                        loader: statsLoader(queryClient),
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: 'all-reviews',
                        element: <AllReviews />,
                        loader: allReviewsLoader(queryClient),
                        errorElement: <ErrorElement />,
                    },
                    {
                        path: 'profile',
                        element: <Profile />,
                        action: profileAction(queryClient),
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                        loader: adminLoader,
                    },
                    {
                        path: 'edit-reviews/:id',
                        element: <EditReviews />,
                        loader: editReviewsLoader(queryClient),
                        action: editReviewsAction(queryClient),
                    },
                    { path: 'delete-review/:id', action: deleteReviewsAction(queryClient) },
                ],
            },
        ],
    },
]);

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
export default App;
