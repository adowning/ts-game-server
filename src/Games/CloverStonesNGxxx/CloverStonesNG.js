class Server {
  get(request, game) {
    var userId = request
    if (userId == undefined) {
      var response = '{"responseEvent":"error","responseType":"","serverResponse":"invalid login"}'
      throw die(response)
    }
    var slotSettings = new SlotSettings(game, userId)
    if (!slotSettings.is_active()) {
      response = '{"responseEvent":"error","responseType":"","serverResponse":"Game is disabled"}'
      throw die(response)
    }
    var postData = php_input()
    var balanceInCents = 10000 // Hardcoded balance
    var result_tmp = []
    var aid = ''
    if (undefined !== postData.gameData && undefined !== postData.gameData.cmd) {
      postData = postData.gameData
    }
    if (undefined !== postData.cmd) {
      aid = String(postData.cmd)
    } else if (undefined !== postData.action) {
      aid = String(postData.action)
    } else {
      response = '{"responseEvent":"error","responseType":"","serverResponse":"incorrect action"}'
      throw die(response)
    }

    switch (aid) {
      case 'AuthRequest':
        // Hardcoded AuthResponse - matches PHP output exactly
        result_tmp[0] = '{"action":"AuthResponse","result":"true","sesId":"10000569942","data":{"snivy":"proxy v6.10.48 (API v4.23)","supportedFeatures":["Offers","Jackpots","InstantJackpots","SweepStakes"],"sessionId":"10000569942","defaultLines":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19"],"bets":["1","2","3","4","5","10","15","20","30","40","50","100","200","400"],"betMultiplier":"1.0000000","defaultBet":"1","defaultCoinValue":"0.01","coinValues":["0.01"],"gameParameters":{"availableLines":[["1","1","1","1","1"],["2","2","2","2","2"],["0","0","0","0","0"],["3","3","3","3","3"],["1","2","3","2","1"],["2","1","0","1","2"],["0","0","1","2","3"],["3","3","2","1","0"],["1","0","0","0","1"],["2","3","3","3","2"],["0","1","2","3","3"],["3","2","1","0","0"],["1","0","1","2","1"],["2","3","2","1","2"],["0","1","0","1","0"],["3","2","3","2","3"],["1","2","1","0","1"],["2","1","2","3","2"],["0","1","1","1","0"],["3","2","2","2","3"]],"rtp":"0.00","payouts":[{"payout":"16","symbols":["1","1","1"],"type":"basic"},{"payout":"32","symbols":["1","1","1","1"],"type":"basic"},{"payout":"80","symbols":["1","1","1","1","1"],"type":"basic"},{"payout":"16","symbols":["2","2","2"],"type":"basic"},{"payout":"24","symbols":["2","2","2","2"],"type":"basic"},{"payout":"48","symbols":["2","2","2","2","2"],"type":"basic"},{"payout":"16","symbols":["3","3","3"],"type":"basic"},{"payout":"24","symbols":["3","3","3","3"],"type":"basic"},{"payout":"48","symbols":["3","3","3","3","3"],"type":"basic"},{"payout":"8","symbols":["4","4","4"],"type":"basic"},{"payout":"16","symbols":["4","4","4","4"],"type":"basic"},{"payout":"32","symbols":["4","4","4","4","4"],"type":"basic"},{"payout":"8","symbols":["5","5","5"],"type":"basic"},{"payout":"16","symbols":["5","5","5","5"],"type":"basic"},{"payout":"32","symbols":["5","5","5","5","5"],"type":"basic"},{"payout":"4","symbols":["6","6","6"],"type":"basic"},{"payout":"8","symbols":["6","6","6","6"],"type":"basic"},{"payout":"16","symbols":["6","6","6","6","6"],"type":"basic"},{"payout":"4","symbols":["7","7","7"],"type":"basic"},{"payout":"8","symbols":["7","7","7","7"],"type":"basic"},{"payout":"16","symbols":["7","7","7","7","7"],"type":"basic"},{"payout":"4","symbols":["8","8","8"],"type":"basic"},{"payout":"8","symbols":["8","8","8","8"],"type":"basic"},{"payout":"16","symbols":["8","8","8","8","8"],"type":"basic"},{"payout":"4","symbols":["9","9","9"],"type":"basic"},{"payout":"8","symbols":["9","9","9","9"],"type":"basic"},{"payout":"16","symbols":["9","9","9","9","9"],"type":"basic"},{"payout":"4","symbols":["10","10","10"],"type":"basic"},{"payout":"8","symbols":["10","10","10","10"],"type":"basic"},{"payout":"16","symbols":["10","10","10","10","10"],"type":"basic"},{"payout":"4","symbols":["11","11","11"],"type":"basic"},{"payout":"8","symbols":["11","11","11","11"],"type":"basic"},{"payout":"16","symbols":["11","11","11","11","11"],"type":"basic"},{"payout":"4","symbols":["12","12","12"],"type":"basic"},{"payout":"8","symbols":["12","12","12","12"],"type":"basic"},{"payout":"16","symbols":["12","12","12","12","12"],"type":"basic"},{"payout":"4","symbols":["13","13","13"],"type":"basic"},{"payout":"8","symbols":["13","13","13","13"],"type":"basic"},{"payout":"16","symbols":["13","13","13","13","13"],"type":"basic"},{"payout":"4","symbols":["14","14","14"],"type":"basic"},{"payout":"8","symbols":["14","14","14","14"],"type":"basic"},{"payout":"16","symbols":["14","14","14","14","14"],"type":"basic"},{"payout":"4","symbols":["15","15","15"],"type":"basic"},{"payout":"8","symbols":["15","15","15","15"],"type":"basic"},{"payout":"16","symbols":["15","15","15","15","15"],"type":"basic"},{"payout":"1","symbols":["100"],"type":"basic"},{"payout":"3","symbols":["101"],"type":"basic"},{"payout":"2","symbols":["102"],"type":"basic"},{"payout":"10","symbols":["103"],"type":"basic"},{"payout":"1","symbols":["105"],"type":"basic"},{"payout":"5","symbols":["106"],"type":"basic"},{"payout":"2","symbols":["107"],"type":"basic"},{"payout":"30","symbols":["108"],"type":"basic"}]},"jackpotsEnabled":"true","gameModes":"[]}}"'
        break
      case 'SpinRequest':
        // Hardcoded SpinResponse - sample winning spin
        result_tmp[0] = '{"action":"SpinResponse","result":"true","sesId":"10000569942","data":{"reelsSymbols":{"reel1":[8,10,9],"reel2":[10,7,9],"reel3":[10,9,7],"reel4":[9,6,8],"reel5":[7,8,10],"rp":[15,22,18,12,8]},"slotLines":20,"slotBet":1,"totalFreeGames":0,"currentFreeGames":0,"Balance":9980,"afterBalance":9980,"bonusWin":0,"totalWin":0,"winLines":[],"BonusSymbol":-1,"Jackpots":[],"freeState":""}}'
        break
      case 'FreeSpinRequest':
        // Hardcoded FreeSpinResponse
        result_tmp[0] = '{"action":"FreeSpinResponse","result":"true","sesId":"10000569942","data":{"reelsSymbols":{"reel1":[1,1,1],"reel2":[1,1,1],"reel3":[1,1,1],"reel4":[1,1,1],"reel5":[1,1,1],"rp":[5,10,15,20,25]},"slotLines":20,"slotBet":1,"totalFreeGames":10,"currentFreeGames":1,"Balance":10000,"afterBalance":10000,"bonusWin":80,"totalWin":80,"winLines":[],"BonusSymbol":5,"Jackpots":[],"freeState":""}}'
        break
      case 'BalanceRequest':
        // Hardcoded BalanceResponse
        result_tmp[0] = '{"action":"BalanceResponse","result":"true","sesId":"10000569942","data":{"balance":' + balanceInCents + '}}'
        break
      case 'InitRequest':
        // Hardcoded InitResponse
        result_tmp[0] = '{"action":"InitResponce","result":"true","sesId":"a40e5dc15a83a70f288e421fbcfc6de8","data":{"id":16183084}}'
        break
      case 'EventsRequest':
        // Hardcoded EventsResponse
        result_tmp[0] = '{"action":"EventsResponse","result":"true","sesId":"10000569942","data":{"events":[]}}'
        break
      case 'APIVersionRequest':
        // Hardcoded APIVersionResponse
        result_tmp[0] = '{"action":"APIVersionResponse","result":"true","sesId":"10000569942","data":{"version":"1.0"}}'
        break
      case 'CheckBrokenGameRequest':
        // Hardcoded CheckBrokenGameResponse
        result_tmp[0] = '{"action":"CheckBrokenGameResponse","result":"true","sesId":"10000569942","data":{"broken":false}}'
        break
      case 'PickBonusItemRequest':
        // Hardcoded PickBonusItemResponse
        result_tmp[0] = '{"action":"PickBonusItemResponse","result":"true","sesId":"10000569942","data":{"item":0,"win":0}}'
        break
      default:
        response = '{"responseEvent":"error","responseType":"","serverResponse":"Unknown action: ' + aid + '"}'
        throw die(response)
    }
    
    response = result_tmp[0]
    slotSettings.SaveGameData()
    slotSettings.SaveGameDataStatic()
    echo(response)
  }
}
