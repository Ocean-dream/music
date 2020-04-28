import React from 'react'
import {Redirect} from 'react-router-dom'
import Home from './../application/Home/Home'
import Recommend from './../application/Recommend'
import Singers from './../application/Singer/Singer'
import Rank from './../application/Rank/Rank'

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => {
          return (
            <Redirect to={"/recommend"} />
          )
        }
      },
      {
        path: "/recommend",
        component: Recommend
      },
      {
        path: "/singers",
        component: Singers
      },
      {
        path: "/rank",
        component: Rank
      }
    ]
  }
]