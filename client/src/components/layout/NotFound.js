import React, { Fragment } from 'react'

const NotFound = props => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclamation-triangle"></i> {' '} Page not Found
            </h1>

            <p>Sorry, this page doesn't exists.</p>
        </Fragment>
    )
}


export default NotFound
