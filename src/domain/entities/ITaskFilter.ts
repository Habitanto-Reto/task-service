export interface ITaskFilter {
    pageNumber: number;
    pageSize: number;
    creatorUserId?: string;
    assigneeUserId?: string;
}