# GhostTrain: San Francisco
## Mobile Application
_An open source predictions platform built by SF Muni commuters for SF Muni commuters to provide more accurate estimates their next train's arrival time._

## So here's the deal.... ##
As daily Muni commuters, we often plan our departure around SF Muni’s arrival estimates, so one can imagine our frustration when we rush to a station expecting a train to come in 5 minutes only to wait 15 more minutes for that same train to arrive.

Additionally, there’s nothing more disheartening than leaving work at 11:45 PM expecting trains to be running only to find out the estimates on the Muni arrival boards are ghost trains.

We built _GhostTrain: San Francisco_ to mitigate these two problems.

## Our Solution. ##
### 1. Daily Time-Series Arrival Predictions
_GhostTrain: San Francisco_ not only provides SF Muni's arrival predictions, but also delays for each prediction based on daily aggregation of time-series data collected from [NextBus's API]("https://gist.github.com/grantland/7cf4097dd9cdf0dfed14").

For example, suppose a train’s next arrival prediction is 10 minutes, but 10 minutes later the train has yet to come. If the next arrival prediction now says the next train is coming in 5 minutes, we know the train deviated 5 minutes from its original schedule. 

Users who see this delay of 5 minutes will know that this prediction is unreliable and should take caution when planning their trip.

These delays often reflect information not communicated to muni customers such as tunnel congestion, maintenance, or emergencies.

### 2. Ghost Train Warnings
_GhostTrain: San Francisco_ also communicates if users can expect a given Muni arrival prediction to be a ghost train. NextBus’s API exposes data respective to active trains for a given route. By querying this data, we are able to communicate to users if their desired route has any active trains available, despite what Muni arrival boards may display. 

By providing this data to users, users can decide upon new travel plans before arriving at a muni station only to find the gates locked shut.

## Stay in Touch! ##
_GhostTrain: San Francisco_ is built for all of you wonderful people! We are working hard to deploy our platform for the web, iOS, and Android. Feel free to watch/star/fork our repos, the more the merrier!

## Relevant Repositories ##
[Web Platform]("https://github.com/GhostTrainSF/Web")
[Mobile Platform]("https://github.com/GhostTrainSF/Mobile")
[API Service]("https://github.com/GhostTrainSF/v1-api")
[DB Service]("https://github.com/GhostTrainSF/db")

## Contributors ##
Eric Cuyle ([@ecuyle]("https://github.com/ecuyle"))
Jacky Lei ([@jackylei94]("https://github.com/JackyLei94"))

