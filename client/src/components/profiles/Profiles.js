import React, { Fragment, useEffect } from 'react'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { getProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'
import PropTypes from 'prop-types'

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {

    useEffect(() => {
        getProfiles()
    }, [getProfiles])
    return (
        <Fragment>
            {loading ? <Spinner /> : (
                <Fragment>
                    <h1 className="large text-primary">
                        Developers
                    </h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"></i> {' '} Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.map((profile) => {
                                return (
                                    <ProfileItem key={profile._id} profile={profile} />
                                )
                            })
                        ) :
                            <h4>No profile found</h4>
                        }
                    </div>
                </Fragment>
            )
            }
        </Fragment >
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getProfiles })(Profiles)