
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const ArticlesPage = lazy(() => import('../pages/articles/page'));
const ArticleDetailPage = lazy(() => import('../pages/articles/detail/page'));
const VideosPage = lazy(() => import('../pages/videos/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const AdminLoginPage = lazy(() => import('../pages/admin/login/page'));
const AdminDashboardPage = lazy(() => import('../pages/admin/dashboard/page'));
const AdminArticlesPage = lazy(() => import('../pages/admin/articles/page'));
const AdminNewArticlePage = lazy(() => import('../pages/admin/articles/new/page'));
const AdminEditArticlePage = lazy(() => import('../pages/admin/articles/edit/page'));
const AdminVideosPage = lazy(() => import('../pages/admin/videos/page'));
const AdminNewVideoPage = lazy(() => import('../pages/admin/videos/new/page'));
const AdminEditVideoPage = lazy(() => import('../pages/admin/videos/edit/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/articles',
    element: <ArticlesPage />,
  },
  {
    path: '/articles/:id',
    element: <ArticleDetailPage />,
  },
  {
    path: '/videos',
    element: <VideosPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboardPage />,
  },
  {
    path: '/admin/articles',
    element: <AdminArticlesPage />,
  },
  {
    path: '/admin/articles/new',
    element: <AdminNewArticlePage />,
  },
  {
    path: '/admin/articles/edit/:id',
    element: <AdminEditArticlePage />,
  },
  {
    path: '/admin/videos',
    element: <AdminVideosPage />,
  },
  {
    path: '/admin/videos/new',
    element: <AdminNewVideoPage />,
  },
  {
    path: '/admin/videos/edit/:id',
    element: <AdminEditVideoPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
