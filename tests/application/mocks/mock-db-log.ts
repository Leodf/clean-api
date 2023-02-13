import { LogErrorRepository } from '@/application/protocols/db/log'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stackError: string): Promise<void> {
      await Promise.resolve()
    }
  }
  return new LogErrorRepositoryStub()
}
