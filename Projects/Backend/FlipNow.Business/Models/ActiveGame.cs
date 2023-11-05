using FlipNow.Business.Services;
using FlipNow.Common.Entities;
using System.Runtime;
using System.Text.Json.Serialization;

namespace FlipNow.Business.Models;

public class ActiveGame
{
    public ActiveGame(UnitOfWork uow, User host)
    {
        Cards = uow.CardRepository.GetAllTwiceShuffled().Select(c => new GameCard(c)).ToList();
        Host = new Player(host, this);
        LobbyName = $"{host.Username}'s game";
        Players = new List<Player>() { Host };
        Turn = new Turn(Host);
        Settings = new GameSettings(
            LobbyName, 
            GameService.MAX_PLAYERS_ALLOWED, 
            Cards.Count);
    }

    public string LobbyName { get; set; }
    public string InviteCode { get; } = Guid.NewGuid().ToString();
    public int LobbyLimit { get; set; } = GameService.MAX_PLAYERS_ALLOWED;
    public readonly int MaxPlayerAllowed = GameService.MAX_PLAYERS_ALLOWED;

    public GameSettings Settings { get; private set; }
    public void SetSettings(GameSettings value, UnitOfWork uow)
    {
        if (value.Cards != Cards.Count) Cards = uow.CardRepository
            .GetAllTwiceShuffled(value.Cards / 2)
            .Select(c => new GameCard(c))
            .ToList();
        
        if (value.LobbyName != LobbyName) 
            LobbyName = value.LobbyName;
        
        if (value.LobbyLimit != LobbyLimit 
            && value.LobbyLimit <= GameService.MAX_PLAYERS_ALLOWED) 
            LobbyLimit = value.LobbyLimit;

        Settings = value;
    }

    #region Players
    public List<Player> Players { get; }

    private int _turnPlayerIndex = 0;

    public int TurnPlayerIndex 
    {
        get => _turnPlayerIndex;
        set 
        {
            if (value < 0 || Players.Count <= value) throw new ArgumentOutOfRangeException(nameof(value), value, "Index out of range");
            _turnPlayerIndex = value;
        } 
    }
    public Turn Turn { get; }
    public Player Host { get; internal set; }
    public List<Player> Leaderboard => Players.OrderByDescending(p => p.Score).ToList();
    #endregion

    public List<GameCard> Cards { get; internal set; }
    public PlayState PlayState { get; set; } = PlayState.IDLE;
}
