export default {
    methods: {
        submitForm(){
            let startingDate = null;
            let endingDate = null;

            let genresId = this.getMovieGenres.filter(genre => this.getGenresSelected.some(b => genre.name === b));

            let arrayId = [];

            for(const genres of genresId){
                arrayId.push(genres.id);
            }

            console.log(arrayId);

            switch (this.getEraSelected){
                case "50's":
                    startingDate = "1950-01-01";
                    endingDate = "1959-12-31";
                    break;
                case "60's":
                    startingDate = "1960-01-01";
                    endingDate = "1969-12-31";
                    break;
                case "70's":
                    startingDate = "1970-01-01";
                    endingDate = "1979-12-31";
                    break;
                case "80's":
                    startingDate = "1980-01-01";
                    endingDate = "1989-12-31";
                    break;
                case "90's":
                    startingDate = "1990-01-01";
                    endingDate = "1999-12-31";
                    break;
                case "2000's":
                    startingDate = "2000-01-01";
                    endingDate = "2009-12-31";
                    break;
                case "2010's":
                    startingDate = "2010-01-01";
                    endingDate = "2019-12-31";
                    break;
            }
            const payload = {
                genres: arrayId.toString(),
                startingDate: startingDate,
                endingDate : endingDate
            };
            console.log("payload" , payload);
            this.$store.dispatch('fetchMovie', payload);
            this.displayMovieInfos = true;
        },
    }
}