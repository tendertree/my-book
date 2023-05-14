import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'


const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Hello world!</div>,
	},
]);

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools />
			<RouterProvider router={router} />
			<App />
		</QueryClientProvider>
	</React.StrictMode>,
)
