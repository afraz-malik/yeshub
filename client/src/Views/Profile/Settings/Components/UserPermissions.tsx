import * as React from "react"

export interface UserPermissionsProps {}

const UserPermissions: React.FC<UserPermissionsProps> = () => {
    return (
        <form method="POST">
            <div className="row">
                <div className="col-sm-8">
                    <div className="form-group">
                        <input
                            id="postTitle"
                            className="form-control form-input2"
                            type="text"
                            name="postTitle"
                            disabled
                            placeholder="Home office"
                        />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <div className="switch-toggle bg-green">
                            <input
                                id="hfAdmin"
                                name="homeOffice"
                                value="hfAdmin"
                                type="radio"
                                checked={true}
                            />
                            <label htmlFor="hfAdmin"></label>

                            <input
                                id="hfMods"
                                name="homeOffice"
                                value="hfMods"
                                type="radio"
                            />
                            <label htmlFor="hfMods"></label>

                            <input
                                id="hfPublic"
                                name="homeOffice"
                                value="hfPublic"
                                type="radio"
                            />
                            <label htmlFor="hfPublic"></label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-8">
                    <div className="form-group">
                        <input
                            id="hremail"
                            className="form-control form-input2"
                            type="text"
                            name="hremail"
                            disabled
                            placeholder="HR Email Address"
                        />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="form-group">
                        <div className="switch-toggle bg-grey">
                            <input
                                id="hrAdmin"
                                name="hrEmail"
                                value="hrAdmin"
                                type="radio"
                                checked={true}
                            />
                            <label htmlFor="hrAdmin"></label>

                            <input
                                id="hrMods"
                                name="hrEmail"
                                value="hrMods"
                                type="radio"
                            />
                            <label htmlFor="hrMods"></label>

                            <input
                                id="hrPublic"
                                name="hrEmail"
                                value="hrPublic"
                                type="radio"
                            />
                            <label htmlFor="hrPublic"></label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3">
                <h6 className="event-head-text">Project/Program</h6>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <input
                            id="postTitle"
                            className="form-control form-input2"
                            type="text"
                            name="postTitle"
                            placeholder="Title"
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h6 className="event-head-text">
                        Personal Statement (Optional)
                    </h6>
                    <textarea
                        rows={5}
                        className="form-control form-input2"
                        placeholder="Short Description"
                    ></textarea>
                </div>
            </div>

            <div className="add-sub-events mb-2 pb-1">
                <a href="#">
                    <span>+ Add another</span>
                </a>
            </div>
            <div className="form-group">
                <label className="checkBox2">
                    Display in public?
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                </label>
            </div>
            <div className="form-group mt-2 text-right">
                <button className="btn btn-save">SAVE</button>
            </div>
        </form>
    )
}

export default UserPermissions
