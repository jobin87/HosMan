// import Login from "./pages/login";

import { Outlet } from "react-router-dom";
import {LoadingView} from "src/sections/auth/view";
import { CenteredSignInView } from "src/sections/auth/view/sign-in-view";

export const authRoutes = [
  {
    path: "/auth",
    element:(
      <Outlet/>
    ),
    children:[
      {
        path:"loading-page",
        element:(
          <LoadingView/>
        )
      },
      {
        path:"sign-in",
        element:(
          <CenteredSignInView/>
        )
      },
      
    ]
  },
  
];