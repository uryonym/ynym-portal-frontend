/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TaskImport } from './routes/task'
import { Route as SigninImport } from './routes/signin'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TaskRoute = TaskImport.update({
  path: '/task',
  getParentRoute: () => rootRoute,
} as any)

const SigninRoute = SigninImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/signin': {
      id: '/signin'
      path: '/signin'
      fullPath: '/signin'
      preLoaderRoute: typeof SigninImport
      parentRoute: typeof rootRoute
    }
    '/task': {
      id: '/task'
      path: '/task'
      fullPath: '/task'
      preLoaderRoute: typeof TaskImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  SigninRoute,
  TaskRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/signin",
        "/task"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/task": {
      "filePath": "task.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
