import React from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItem from '@material-ui/core/ListItem'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  list: {
    margin: theme?.spacing(1, 0),
    width: 360,
    backgroundColor: theme?.palette?.background?.paper,
    maxHeight: '40vh',
    overflowY: 'auto'
  },
  subheader: {
    textAlign: 'center'
  }
}))

const hasValue = value => (value ? undefined : 'Cannot be empty')

const isUnique = (value, allValues) => {
  const { todos = [] } = allValues
  const isUnique = todos.findIndex(({ todo }) => todo === value) === -1
  return isUnique ? undefined : 'Todo must be unique'
}

const composeValidators = (...validators) => (value, allValues) =>
  validators.reduce(
    (error, validator) => error || validator(value, allValues),
    undefined
  )

function Form() {
  const classes = useStyles()
  const [touched, setTouched] = React.useState(false)
  return (
    <FinalForm onSubmit={() => {}} mutators={arrayMutators}>
      {({ handleSubmit, form: { mutators } }) => (
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <FieldArray name="todos">
                {({ fields }) => (
                  <List
                    dense
                    className={classes.list}
                    aria-label="todos list"
                    subheader={
                      <ListSubheader className={classes.subheader}>
                        Todos
                      </ListSubheader>
                    }
                  >
                    {fields.map((name, index) => (
                      <ListItem key={fields?.value?.[index].todo}>
                        <Field name={`${name}.todo`}>
                          {({ input: { value } }) => (
                            <Typography>{value}</Typography>
                          )}
                        </Field>
                      </ListItem>
                    ))}
                  </List>
                )}
              </FieldArray>
            </Grid>
            <Grid item>
              <Field
                name="todo"
                validate={composeValidators(hasValue, isUnique)}
              >
                {({ input: { value, onChange }, meta: { error } }) => (
                  <TextField
                    id="new_todo"
                    label="New Todo"
                    value={value}
                    error={error && touched}
                    helperText={touched && error}
                    onChange={onChange}
                    onKeyDown={e => {
                      !touched && setTouched(true)
                      if (e.key === 'Enter' && !error) {
                        mutators.push('todos', { complete: false, todo: value })
                        onChange('')
                        setTouched(false)
                      }
                    }}
                    autoFocus
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Tooltip title="Add Todo">
                            <IconButton
                              aria-label="add-todo"
                              onClick={() => {
                                if (!error) {
                                  mutators.push('todos', value)
                                  onChange('')
                                  setTouched(false)
                                }
                              }}
                            >
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              </Field>
            </Grid>
          </Grid>
        </form>
      )}
    </FinalForm>
  )
}

export default Form
