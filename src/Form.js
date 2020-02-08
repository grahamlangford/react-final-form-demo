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
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: '40vh',
    overflowY: 'auto'
  }
}))

function Form() {
  const classes = useStyles()
  return (
    <FinalForm onSubmit={() => {}} mutators={arrayMutators}>
      {({ handleSubmit, form: { mutators } }) => (
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" component="h1" align="center">
            React Final Form Todos
          </Typography>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <FieldArray name="todos">
                {({ fields }) => (
                  <List
                    dense
                    className={classes.list}
                    aria-label="todos list"
                    subheader={<ListSubheader>Todos</ListSubheader>}
                  >
                    {fields.map((name, index) => (
                      <ListItem key={fields?.value?.[index]}>
                        <Field name={name}>
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
              <Field name="todo">
                {({ input: { value, onChange } }) => (
                  <TextField
                    id="new_todo"
                    label="New Todo"
                    value={value}
                    onChange={onChange}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        mutators.push('todos', value)
                        onChange('')
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
                                mutators.push('todos', value)
                                onChange('')
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
