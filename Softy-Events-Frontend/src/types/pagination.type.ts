export type Meta = {
  limit: number
  hasPrevPage: boolean
  hasNextPage: boolean
  hasMore: boolean
  totalDocs: number
  page: number
  pagingCounter: number
}

export type PaginationModel<T> = {
  docs: T[]
  meta: Meta
}
