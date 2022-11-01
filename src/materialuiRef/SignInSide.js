import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef, useState } from 'react';
import axios, { Axios } from 'axios';
import Parse from 'parse/dist/parse.min.js';
import { useHistory } from "react-router-dom";
const theme = createTheme();

export default function SignInSide() {
    const history = useHistory();
    const urlLink = useRef(null)
    const token = useRef(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        await axios.post("https://reqres.in/api/users"
            //  ,{
            //     token: data.get('token'),
            //       ...formFields
            //     }
        ).then(async res => {
            try {
                // create a new Parse Object instance
                const Person = new Parse.Object('apiInformation');
                // define the attributes you want for your Object

                if (res.status == 201) {
                    console.log(formFields, "formfields@");
                    console.log(res.data.createdAt, "created@");
                    console.log(data.get('urlLink'), "urlLink@");
                    console.log(data.get('token'), "token@");

                    let some =JSON.stringify(formFields)
                    console.log(some ,"i am going");
                    Person.set('datas',some);
                    Person.set('url', data.get('urlLink'));
                    Person.set('token', data.get('token'))
                    Person.set('Status', 'succesfully');
                }
                // save it on Back4App Data Store
                await Person.save();
                console.log('OBJECT saved!');
            } catch (error) {
                console.log('Error saving new OBJECT: ', error);
            }
        });
    };
    const [formFields, setFormFields] = useState([
        { jskey: '', jsval: '' },
    ])
    // async function addPerson() {
    //     try {
    //       // create a new Parse Object instance
    //       const Person = new Parse.Object('Person');
    //       // define the attributes you want for your Object
    //       Person.set('name', 'Raj');
    //       Person.set('email', 'Raj@back4app.com');
    //       // save it on Back4App Data Store
    //       await Person.save();
    //       alert('Person saved!');
    //     } catch (error) {
    //       console.log('Error saving new person: ', error);
    //     }
    //   }

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }
    
    const addFields = () => {
        let object = {
            jskey: '',
            jsval: ''
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5">
                    Post Api
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        ref={urlLink}
                        margin="normal"
                        required
                        fullWidth
                        id="urlLink"
                        label="Url Link"
                        name="urlLink"
                        autoFocus
                    />
                    <TextField
                        ref={token}
                        margin="normal"
                        required
                        fullWidth
                        name="token"
                        label="Auth Token"
                        id="token"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"

                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Post
                    </Button>
                </Box>
                <Box>
                    <form>
                        {formFields.map((form, index) => {
                            return (
                                <Box key={index}>
                                    <TextField
                                        margin="normal"
                                        name='jskey'
                                        label='Key'
                                        onChange={event => handleFormChange(event, index)}
                                        value={form.name}
                                    />{ }
                                    <TextField
                                        margin="normal"
                                        name='jsval'
                                        label='Value'
                                        onChange={event => handleFormChange(event, index)}
                                        value={form.age}
                                    />
                                    <Button variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={() => removeFields(index)}>Remove</Button>
                                </Box>
                            )
                        })}
                    </form>
                    <Button variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={addFields}>Add More..</Button>
                    <br />
                    <Button variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={()=>history.push('./home')}>View info</Button>
                </Box>
            </Box>
        </ThemeProvider>
    );
}