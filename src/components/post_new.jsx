import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component{

    renderField(field){
        //destructurar: el objeto field tiene una propiedad meta, que a su vez tiene la propiedad touched y error
        const {meta: {touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`; 
        return(
            <div className={className}> 
                <label>{field.label}</label>
                <input type="text" {...field.input} className="form-control"/>
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>            
        )
    }

    onSubmit(values){
        //El componente Route automaticamente agrega estos helpers a this.props        
        this.props.createPost(values, ()=>{
            this.props.history.push('/');
        });
    }

    render() {
        //redux-form agrega esta funcion al conectar redux-form al componente        
        const { handleSubmit } = this.props;

        return(
            //handleSubmit es llamada en el evento submit de la forma, handleSubmit es una 
            //funcion de redux-form que valida la forma y esta a su vez recibe como parametro 
            //la funcion que queremos ejecutar una vez validada la forma
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field name="title" label="Title" component={this.renderField}/>
                <Field name="categories" label="Categories" component={this.renderField}/>
                <Field name="content" label="Post Content" component={this.renderField}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values){

    const errors = {};

    if(!values.title){
        errors.title = "Enter a title"
    }
    if(!values.categories){
        errors.categories = "Please enter a categorie"
    }
    if(!values.content){
        errors.content = "Please enter some content"
    }
    //Si el objeto errors esta vacio quiere decir que la forma es validad para hacer submit
    return errors;

}

export default reduxForm({
    validate,
    form:'PostsNewForm'
})(
    connect(null, { createPost })(PostNew)
);
