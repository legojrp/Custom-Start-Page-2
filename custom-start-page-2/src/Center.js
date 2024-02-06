function Center (){

    return (
        <div className="text-center">
            <form action="https://www.google.com/search"> {/* Google search form */}
                <input type="text" placeholder="Search" id="q" name="q" autoFocus/>
            </form> {/* In the future, we will change this so if it is a valid website, it points directly to the website instead of opening in google */}
        </div>
    );
}
export default Center;