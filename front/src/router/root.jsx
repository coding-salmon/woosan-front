import { Suspense, lazy } from "react";
import boardRouter from "./boardRouter"
import matchingRouter from "./matchingRouter"
import csRouter from "./csRouter"
import myPageRouter from "./myPageRouter";
import adminPageRouter from "./adminPageRouter";

import { createBrowserRouter } from "react-router-dom";

const Loading = <div>Loading....</div>

const Main = lazy(() => import("../pages/main/MainPage"))
const KakaoRedirect = lazy(() => import("../pages/social/KakaoRedirectPage"))

const Board = lazy(() => import("../pages/board/IndexPage"))
const Matching = lazy(() => import("../pages/matching/IndexPage"))
const CS = lazy(() => import("../pages/cs/IndexPage"))
const MyPage = lazy(() => import("../pages/myPage/IndexPage"))
const AdminPage = lazy(() => import("../pages/adminPage/IndexPage"))
const NotFoundPage = lazy(() => import("../pages/NotFoundPage")); // 추가

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "kakao",
        element: <Suspense fallback={Loading}><KakaoRedirect/></Suspense>
    },
    {
        path: "board",
        element: <Suspense fallback={Loading}><Board /></Suspense>,
        children: boardRouter()
    },
    {
        path: "matching",
        element: <Suspense fallback={Loading}><Matching /></Suspense>,
        children: matchingRouter()
    },
    {
        path: "cs",
        element: <Suspense fallback={Loading}><CS /></Suspense>,
        children: csRouter()
    },
    {
        path: "mypage",
        element: <Suspense fallback={Loading}><MyPage /></Suspense>,
        children: myPageRouter()
    },
    {
        path: "adminPage",
        element: <Suspense fallback={Loading}><AdminPage/></Suspense>,
        children: adminPageRouter()
    },
    {
        path: "*", // catch-all route
        element: <Suspense fallback={Loading}><NotFoundPage /></Suspense>
    }
])

export default root;
