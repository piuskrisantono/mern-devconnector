import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import PropTypes from 'prop-types'

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                        Go Back
                    </Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                    )}
                    <div class="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div class="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((exp) => {
                                        return (
                                            <ProfileExperience key={exp._id} experience={exp} />
                                        )
                                    })}
                                </Fragment>
                            ) : (<h4>No previous experience</h4>)}
                        </div>
                        <div class="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((edu) => {
                                        return (
                                            <ProfileEducation key={edu._id} education={edu} />
                                        )
                                    })}
                                </Fragment>
                            ) : (<h4>No previous education</h4>)}
                        </div>
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => (
    {
        profile: state.profile,
        auth: state.auth
    }
)

export default connect(mapStateToProps, { getProfileById })(Profile)