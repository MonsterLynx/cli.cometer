import select from '@inquirer/select'
import input from '@inquirer/input'
import confirm from '@inquirer/confirm'

import { GitProcessor } from "./GitProcessor"

export class Cli {
  choices = [
    {
      name: 'feat',
      value: 'feat',
      description: 'Feature'
    },
    {
      name: 'fix',
      value: 'fix',
      description: 'Fix'
    },
    {
      name: 'refactor',
      value: 'refactor',
      description: 'Refactor'
    },
    {
      name: 'chore',
      value: 'chore',
      description: 'Chore'
    },
    {
      name: 'test',
      value: 'test',
      description: 'Test'
    }
  ]

  constructor(private git = new GitProcessor()) { }

  async run() {
    const prefix = await select({
      message: 'Type of commit:',
      choices: this.choices
    })

    const message = await input({
      message: 'Type in commit message:'
    })

    const task = await this.git.taskId()
    const branch = await this.git.current()

    const result = `${prefix}: ${message} [${task}]`

    const confirmCommit = await confirm({
      message: `Commit message: "${result}"\n  Branch        : "${branch}"\n  Confirm?`
    })

    if (confirmCommit) {
      await this.git.commit(result)

      console.log('Commit Successful!')
    }

  }
}
