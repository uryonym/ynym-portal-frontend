/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TaskImport } from './routes/task'
import { Route as SigninImport } from './routes/signin'
import { Route as RefuelingImport } from './routes/refueling'
import { Route as CarImport } from './routes/car'
import { Route as IndexImport } from './routes/index'
import { Route as NoteIndexImport } from './routes/note/index'
import { Route as NoteNoteIdImport } from './routes/note/$noteId'

// Create/Update Routes

const TaskRoute = TaskImport.update({
  path: '/task',
  getParentRoute: () => rootRoute,
} as any)

const SigninRoute = SigninImport.update({
  path: '/signin',
  getParentRoute: () => rootRoute,
} as any)

const RefuelingRoute = RefuelingImport.update({
  path: '/refueling',
  getParentRoute: () => rootRoute,
} as any)

const CarRoute = CarImport.update({
  path: '/car',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const NoteIndexRoute = NoteIndexImport.update({
  path: '/note/',
  getParentRoute: () => rootRoute,
} as any)

const NoteNoteIdRoute = NoteNoteIdImport.update({
  path: '/note/$noteId',
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
    '/car': {
      id: '/car'
      path: '/car'
      fullPath: '/car'
      preLoaderRoute: typeof CarImport
      parentRoute: typeof rootRoute
    }
    '/refueling': {
      id: '/refueling'
      path: '/refueling'
      fullPath: '/refueling'
      preLoaderRoute: typeof RefuelingImport
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
    '/note/$noteId': {
      id: '/note/$noteId'
      path: '/note/$noteId'
      fullPath: '/note/$noteId'
      preLoaderRoute: typeof NoteNoteIdImport
      parentRoute: typeof rootRoute
    }
    '/note/': {
      id: '/note/'
      path: '/note'
      fullPath: '/note'
      preLoaderRoute: typeof NoteIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  CarRoute,
  RefuelingRoute,
  SigninRoute,
  TaskRoute,
  NoteNoteIdRoute,
  NoteIndexRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/car",
        "/refueling",
        "/signin",
        "/task",
        "/note/$noteId",
        "/note/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/car": {
      "filePath": "car.tsx"
    },
    "/refueling": {
      "filePath": "refueling.tsx"
    },
    "/signin": {
      "filePath": "signin.tsx"
    },
    "/task": {
      "filePath": "task.tsx"
    },
    "/note/$noteId": {
      "filePath": "note/$noteId.tsx"
    },
    "/note/": {
      "filePath": "note/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
