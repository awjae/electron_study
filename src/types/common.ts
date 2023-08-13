type StateType = 'done' | 'ready' | 'delete'

type TodoType = {
  contents?: string
  date?: string
  no?: number
  state: StateType
}
