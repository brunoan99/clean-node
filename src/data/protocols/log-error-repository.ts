export interface LogErrorRepository {
  log: (StackError: string) => Promise<void>
}
