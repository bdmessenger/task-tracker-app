
const Header = ({formCollapse, setFormCollapse}) => (
    <header className="mb-4">
        <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0 p-0">Task Tracker</h4>
            {
                formCollapse ? 
                    <button className="btn btn-danger" onClick={() => setFormCollapse(state => !state)}>Close</button>
                :
                    <button className="btn btn-primary" onClick={() => setFormCollapse(state => !state)}>Add</button>
            }
        </div>
        <hr/>
    </header>
)

export default Header;