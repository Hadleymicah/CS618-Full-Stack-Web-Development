import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Blog } from './Blog.jsx'
const queryClient = new QueryClient()

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
])

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
