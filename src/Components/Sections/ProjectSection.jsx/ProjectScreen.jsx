import { useEffect, useCallback, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProjects } from "../../../Features/Project/projectSlice"
import { AlertCircle, FolderOpen, Calendar, Clock, ExternalLink, Eye } from "lucide-react"
import { NavLink } from "react-router-dom"

export const ProjectCard = memo(({ project, index }) => {
  const handleImageError = useCallback((e) => {
    e.currentTarget.src = "/placeholder.svg?height=200&width=300"
  }, [])

  // Format date if available
  const formattedDate = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No date available"

  return (
    <div
      className="group relative flex h-auto min-h-[160px] w-full cursor-pointer flex-col md:flex-row items-start md:items-center justify-between overflow-hidden rounded-xl transition-all duration-300 ease-in-out border border-gray-800 hover:border-gray-600  hover:bg-gray-800"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeIn 0.5s ease-out forwards",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
      role="button"
      tabIndex={0}
      aria-label={`View project ${project.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          console.log("Selected project:", project.name)
        }
      }}
    >
      <div className="flex flex-col items-start gap-2 p-6 flex-grow">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-gray-500 to-gray-400 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg">
              {project.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
              {project.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/70 transition-colors text-gray-300"
              aria-label="View project details"
            >
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p   dangerouslySetInnerHTML={{ __html: project.description }} className="text-gray-100/80 line-clamp-2 max-w-2xl">
        </p>

        <div className="flex items-center text-sm text-gray-300/70 mt-2 flex-wrap gap-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last updated {new Date(project.updatedAt).toLocaleString('en-US') || "recently"}</span>
          </div>
          
        </div>
      </div>

      <div className="flex items-center">
        {project.images?.[0] && (
          <div className="relative h-[160px] w-[240px] overflow-hidden bg-gray-900/50">
            <div className="absolute inset-0 bg-gradient-to-r from-[#01323b]/80 via-transparent to-transparent z-10"></div>
            <img
              src={project.images[0] || "/placeholder.svg"}
              alt={`${project.name} preview`}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              onError={handleImageError}
              loading="lazy"
            />
            <div className="absolute bottom-0 right-0 p-3 bg-gray-800/80 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <NavLink to={`/projects/${project.name}`}><ExternalLink className="h-5 w-5 text-white" /></NavLink>
              
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

ProjectCard.displayName = "ProjectCard"

const LoadingSkeleton = () => (
  <div className="flex flex-col gap-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="flex flex-col md:flex-row h-[160px] w-full rounded-xl border border-gray-800 bg-[#01323b] overflow-hidden"
        style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
      >
        <div className="flex-grow p-6">
          <div className="flex items-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-gray-800/50 animate-pulse mr-4"></div>
            <div className="h-8 w-48 bg-gray-800/50 animate-pulse"></div>
          </div>
          <div className="h-4 w-full bg-gray-800/50 animate-pulse mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-800/50 animate-pulse mb-4"></div>
          <div className="flex gap-4">
            <div className="h-4 w-24 bg-gray-800/50 animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-800/50 animate-pulse"></div>
          </div>
        </div>
        <div className="h-full w-[240px] bg-gray-800/50 animate-pulse"></div>
      </div>
    ))}
  </div>
)

const EmptyState = () => (
  <div
    className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-gray-700 p-8 bg-[#01323b]"
    style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
  >
    <div className="mb-6 h-20 w-20 rounded-full bg-gray-800/50 flex items-center justify-center text-gray-300">
      <FolderOpen size={48} />
    </div>
    <h3 className="mb-3 text-xl font-semibold text-white">No projects available</h3>
    <p className="mb-6 text-gray-100/80 max-w-md">
      There are currently no projects to display. Please check back later.
    </p>
  </div>
)

const ErrorState = ({ error, onRetry }) => (
  <div
    className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-red-700/50 p-8 bg-[#01323b]"
    style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
  >
    <div className="mb-6 h-20 w-20 rounded-full bg-red-900/30 flex items-center justify-center text-red-400">
      <AlertCircle size={48} />
    </div>
    <h3 className="mb-3 text-xl font-semibold text-white">Unable to load projects</h3>
    <p className="mb-6 text-red-300 max-w-md">{error || "An unexpected error occurred. Please try again."}</p>
    <button
      onClick={onRetry}
      className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-[#011e24]"
    >
      Refresh
    </button>
  </div>
)

const ProjectScreen = () => {
  const { projects = [], loading, error } = useSelector((state) => state.projects || {})
  const dispatch = useDispatch()

  const loadProjects = useCallback(() => {
    dispatch(fetchAllProjects())
  }, [dispatch])

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  // Add some CSS for animations and background
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      body {
        background-color: #011e24;
        color: white;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  if (loading) {
    return (
      <div className="p-6 md:p-10 bg-[#011e24] min-h-screen">
        <LoadingSkeleton />
      </div>
    )
  }
  

  if (error) {
    return (
      <div className="p-6 md:p-10 bg-[#011e24] min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-8">Our Projects</h1>
        <ErrorState error={error} onRetry={loadProjects} />
      </div>
    )
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="p-6 md:p-10 bg-[#011e24] min-h-screen">
        <h1 className="text-3xl font-bold text-white mb-8">Our Projects</h1>
        <EmptyState />
      </div>
    )
  }

  return (
    <div className="p-6 md:p-10 pt-0 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-end justify-end gap-4">
            <span className="text-gray-300/80  text-sm">
              Show all Projects
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {projects.slice(0.3).map((project, index) => (
            <ProjectCard key={project.id || project.name || index} project={project} index={index} />
          ))}
           
         
        </div>
      </div>
    </div>
  )
}

export default memo(ProjectScreen)
