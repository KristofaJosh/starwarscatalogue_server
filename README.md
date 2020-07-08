# StarWars Swapi REST API with GraphQL

#### You can consume the [REST API wrapped with GraphQL](https://swapi-chrisjosh-starwars.herokuapp.com/)
#### Documentation is on Graphqli Playground
##### Queries
```
# Basic Sort and filter

{
  characters(gender:male, sort:height_dsc){
    character_data{
      name
      height
      gender
    }
    meta_data{
      total_height{
        cm
        feet
        inches
      }
      total_characters
    } 
  }
}

# movies
{
  movies{
    title
    episode_id   
    comment_count
  }
}

# view comments in movie episodes
{
  movies{
    title
    episode_id
    comments{
      comment
    }
    comment_count
  }
}

# view comments
{
  comments{
    episode
    ip
    comment
    created_at
  }
}

... and more
visit the playground
```

##### Mutation
```
# Create Comment by episode

mutation{
  comment(comment:{episode:"4", comment:"another new comment"}){
    episode
    ip
    created_at
  }
}
```

### Usage

##### Run locally </>
  - clone repo, navigate into folder, run **yarn** then **yarn start_dev** or **yarn start**

##### Run with Docker </>
  - clone repo, navigate into folder, run **docker-compose up**
  - exit with ctrl + c then **docker-compose down**
  

Enjoy!
