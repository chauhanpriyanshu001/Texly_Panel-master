import React, { useContext, useState, useEffect ,useRef} from "react";
import "./ContactUs.css";
import axios from "axios";
import BASE_URL from "../../variable";
import { NameContext } from "../../Context";
import CustomAlert from "../../Alert/CustomAlert";
import { io } from "socket.io-client";
// Material UI imports
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Chip,
  Divider,
  Grid,
  IconButton,
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";



// Icons
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#536dfe',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#9e9e9e',
    },
    success: {
      main: '#1b5e20',
    },
  },
});

// Contact card component to show in the sidebar
const ContactCard = ({ item, getAllContactUs, setActiveContact, isActive }) => {
  // Add safeguards for missing data
  const {
    email = "No email",
    phone = "No phone",
    name = "Unknown",
    status = "Open",
    chatHistory = [],
    createdAt = new Date(),
    _id
  } = item || {};

  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });

  const handleDelete = async () => {
    if (!_id) {
      console.error("Cannot delete: missing contact ID");
      return;
    }

    const token = sessionStorage.getItem("adminToken");
    try {
      // Use the new endpoint
      await axios.delete(
        `${BASE_URL}/admin/chat/${_id}`,
        {
          headers: { token },
        }
      );
      getAllContactUs();
      setAlertState({
        state: true,
        message: "Contact deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Delete error:", error);
      // Fallback to old endpoint if new one fails
      try {
        await axios.delete(
          `${BASE_URL}/contact/DeleteContactUs/${_id}`,
          {
            headers: { token },
          }
        );
        getAllContactUs();
        setAlertState({
          state: true,
          message: "Contact deleted successfully",
          severity: "success",
        });
      } catch (fallbackError) {
        console.error("Fallback delete error:", fallbackError);
        setAlertState({
          state: true,
          message: "Error deleting contact",
          severity: "error",
        });
      }
    }
  };

  // Get the latest message for preview
  const lastMessage = chatHistory && chatHistory.length > 0
    ? chatHistory[chatHistory.length - 1].message
    : "No messages";

  // Format date safely
  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString() : "Unknown date";

  return (
    <>
      <CustomAlert
        open={alertState.state}
        severity={alertState.severity}
        message={alertState.message}
        onClose={() => setAlertState({ ...alertState, state: false })}
      />

      <Card
        className={`contact-card ${isActive ? 'active-contact' : ''}`}
        onClick={() => setActiveContact(item)}
        elevation={isActive ? 6 : 1}
        sx={{
          mb: 2,
          cursor: 'pointer',
          transition: 'all 0.3s',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 },
          border: isActive ? '1px solid #3f51b5' : 'none',
          position: 'relative'
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#3f51b5', mr: 1 }}>
                {name ? name.charAt(0).toUpperCase() : "?"}
              </Avatar>
              <Typography variant="subtitle1" component="div" fontWeight="bold" noWrap>
                {name}
              </Typography>
            </Box>
            <Chip
              label={status}
              size="small"
              color={status === "Open" ? "success" : "default"}
              sx={{ fontSize: '0.7rem' }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" noWrap>
            {email}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, height: '40px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {lastMessage}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="caption" color="text.secondary" display="flex" alignItems="center">
              <AccessTimeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
              {formattedDate}
            </Typography>

            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

// Chat message component
const ChatMessage = ({ message }) => {
  // Add safeguards for missing data
  const {
    sender = "User",
    message: text = "No message content",
    timestamp = new Date()
  } = message || {};

  const isAdmin = sender === "Admin";
  const time = timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Unknown time";

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isAdmin ? 'flex-start' : 'flex-end',
        mb: 2
      }}
    >
      {isAdmin && (
        <Avatar sx={{ bgcolor: '#3f51b5', mr: 1 }}>
          <AdminPanelSettingsIcon fontSize="small" />
        </Avatar>
      )}

      <Box>
        <Paper
          elevation={1}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: isAdmin ? '#f5f5f5' : '#e3f2fd',
            ml: isAdmin ? 0 : 'auto',
            mr: isAdmin ? 'auto' : 0,
          }}
        >
          <Typography variant="body1">{text}</Typography>
        </Paper>
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: isAdmin ? 'left' : 'right',
            mt: 0.5,
            color: 'text.secondary'
          }}
        >
          {time}
        </Typography>
      </Box>

      {!isAdmin && (
        <Avatar sx={{ bgcolor: '#4caf50', ml: 1 }}>
          <PersonIcon fontSize="small" />
        </Avatar>
      )}
    </Box>
  );
};
const socket = io("http://localhost:8080");
const ContactUsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [alertState, setAlertState] = useState({
    state: false,
    message: "",
    severity: "",
  });

  const chatEndRef = useRef(null);

  const { setDashBoardName } = useContext(NameContext);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeContact?.chatHistory]);

  const getAllContactUs = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("adminToken");

      // Use the new API endpoint
      try {
        const res = await axios.get(`${BASE_URL}/admin/chat/messages`, {
          headers: { token },
        });
        console.log("API Response:", res.data);

        if (res.data?.data && Array.isArray(res.data.data)) {
          setContacts(res.data.data);
        } else {
          throw new Error("Invalid data structure from /admin/chat/messages");
        }

        setLoading(false);
      } catch (chatError) {
        console.log("Chat endpoint failed, trying original endpoint:", chatError);

        // Fallback to the original endpoint
        const res = await axios.get(`${BASE_URL}/contact/GetContactUs`, {
          headers: { token },
        });
        console.log("Original API Response:", res.data);

        // Transform the data to match the expected format if needed
        const transformedData = res.data?.data?.map(item => ({
          ...item,
          status: item.status || "Open",
          chatHistory: item.chatHistory || []
        })) || [];

        setContacts(transformedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
      setAlertState({
        state: true,
        message: "Error fetching contacts: " + error.message,
        severity: "error",
      });
      // Set empty array to prevent null reference errors
      setContacts([]);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!activeContact || !activeContact._id) return;

    try {
      const token = sessionStorage.getItem("adminToken");

      // Use the new endpoint
      await axios.patch(
        `${BASE_URL}/admin/chat/status/${activeContact._id}`,
        { status: newStatus },
        { headers: { token } }
      );

      // Update local state
      setActiveContact({ ...activeContact, status: newStatus });

      // Refresh the list
      getAllContactUs();

      setAlertState({
        state: true,
        message: `Status updated to ${newStatus}`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      const token = sessionStorage.getItem("adminToken");
      // Fallback to old endpoint
      try {
        await axios.patch(
          `${BASE_URL}/contact/UpdateContactUs/${activeContact._id}`,
          { status: newStatus },
          { headers: { token } }
        );

        // Update local state
        setActiveContact({ ...activeContact, status: newStatus });

        // Refresh the list
        getAllContactUs();

        setAlertState({
          state: true,
          message: `Status updated to ${newStatus}`,
          severity: "success",
        });
      } catch (fallbackError) {
        console.error("Fallback status update error:", fallbackError);
        setAlertState({
          state: true,
          message: "Error updating status: " + error.message,
          severity: "error",
        });
      }
    }
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !activeContact || !activeContact._id) return;

    try {
      setSending(true);
      const token = sessionStorage.getItem("adminToken");

      // Use the new endpoint
      await axios.patch(
        `${BASE_URL}/admin/chat/reply/${activeContact._id}`,
        {
          message: replyMessage,
          sender: "Admin"
        },
        { headers: { token } }
      );

      // Update local state
      const updatedChatHistory = [
        ...(activeContact.chatHistory || []),
        {
          sender: "Admin",
          message: replyMessage,
          timestamp: new Date()
        }
      ];

      setActiveContact({
        ...activeContact,
        chatHistory: updatedChatHistory
      });

      setReplyMessage("");
      setSending(false);

      // Refresh the list to get updated data
      getAllContactUs();
    } catch (error) {
      console.error("Error sending message:", error);

      // Fallback to old endpoint
      try {
        const updatedChatHistory = [
          ...(activeContact.chatHistory || []),
          {
            sender: "Admin",
            message: replyMessage,
            timestamp: new Date()
          }
        ];
        const token = sessionStorage.getItem("adminToken");
        await axios.patch(
          `${BASE_URL}/contact/UpdateContactUs/${activeContact._id}`,
          { chatHistory: updatedChatHistory },
          { headers: { token } }
        );

        // Update local state
        setActiveContact({
          ...activeContact,
          chatHistory: updatedChatHistory
        });

        setReplyMessage("");
        setSending(false);

        // Refresh the list to get updated data
        getAllContactUs();
      } catch (fallbackError) {
        console.error("Fallback send message error:", fallbackError);
        setSending(false);
        setAlertState({
          state: true,
          message: "Error sending message: " + error.message,
          severity: "error",
        });
      }
    }
  };

  useEffect(() => {
    // Set dashboard name and fetch contacts only once
    setDashBoardName("Contact Management");
    getAllContactUs();

    // Socket listener setup
    socket.on("getMessage", (msg) => {
      console.log("Received socket message:", msg);

      // Make sure the message has the expected format
      if (msg && msg.contactId) {
        setContacts((prevContacts) => {
          return prevContacts.map((contact) => {
            if (contact._id === msg.contactId) {
              return {
                ...contact,
                chatHistory: [...(contact.chatHistory || []), msg],
              };
            }
            return contact;
          });
        });

        setActiveContact((prev) => {
          if (!prev || prev._id !== msg.contactId) return prev;
          return {
            ...prev,
            chatHistory: [...(prev.chatHistory || []), msg],
          };
        });
      } else {
        console.error("Malformed message received:", msg);
      }
    });

    return () => socket.off("getMessage");
  }, []); // Empty dependency array

  useEffect(() => {
    setDashBoardName("Contact Management");
    getAllContactUs();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Box className="contact-us-page">
      <CustomAlert
        open={alertState.state}
        severity={alertState.severity}
        message={alertState.message}
        onClose={() => setAlertState({ ...alertState, state: false })}
      />
      
      <Grid container spacing={3} sx={{ height: 'calc(100vh - 100px)' }}>
        {/* Left sidebar with contacts list */}
        <Grid item xs={12} md={4} sx={{ height: '100%' }}>
          <Paper elevation={3} sx={{ p: 2, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                <ChatIcon sx={{ mr: 1 }} />
                Contact Requests ({contacts.length})
              </Typography>
              
              <Button 
                size="small" 
                variant="outlined"
                onClick={getAllContactUs}
                startIcon={loading ? <CircularProgress size={16} /> : null}
                disabled={loading}
              >
                Refresh
              </Button>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </Box>
            ) : contacts && contacts.length > 0 ? (
              <Box sx={{ overflow: 'auto', flex: 1, pr: 1 }} className="sidebar-contacts-list">
                {contacts.map((contact, idx) => (
                  <ContactCard
                    key={contact._id || idx}
                    item={contact}
                    getAllContactUs={getAllContactUs}
                    setActiveContact={setActiveContact}
                    isActive={activeContact && activeContact._id === contact._id}
                  />
                ))}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="body1" color="text.secondary">
                  No contact requests found
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
        
        {/* Right chat area */}
        <Grid item xs={12} md={8} sx={{ height: '100%' }}>
          <Paper elevation={3} sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {activeContact ? (
              <>
                {/* Contact header */}
                <Box sx={{ p: 2, borderBottom: '1px solid #333', bgcolor: '#212121' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: '#536dfe', mr: 2 }}>
                        {activeContact.name ? activeContact.name.charAt(0).toUpperCase() : "?"}
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{activeContact.name || "Unknown"}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <MarkEmailReadIcon fontSize="small" sx={{ mr: 0.5 }} />
                            {activeContact.email || "No email"}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PhoneEnabledIcon fontSize="small" sx={{ mr: 0.5 }} />
                            +91{activeContact.phone || "No phone"}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box>
                      <Button
                        variant={(activeContact.status === "Open") ? "contained" : "outlined"}
                        color={(activeContact.status === "Open") ? "success" : "primary"}
                        size="small"
                        onClick={() => handleStatusChange(activeContact.status === "Open" ? "Closed" : "Open")}
                        startIcon={activeContact.status === "Open" ? <CloseIcon /> : <ChatIcon />}
                        sx={{ mr: 1 }}
                      >
                        {activeContact.status === "Open" ? "Close" : "Reopen"} Request
                      </Button>
                    </Box>
                  </Box>
                </Box>
                
                {/* Chat messages */}
                <Box sx={{ p: 2, overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }} className="chat-messages-container">
                  {activeContact.chatHistory && activeContact.chatHistory.length > 0 ? (
                    activeContact.chatHistory.map((msg, idx) => (
                      <ChatMessage key={idx} message={msg} />
                    ))
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Typography variant="body1" color="text.secondary">
                        No messages yet. Start a conversation!
                      </Typography>
                    </Box>
                  )}
                  <div ref={chatEndRef} />
                </Box>
                
                {/* Reply form */}
                <Box sx={{ p: 2, borderTop: '1px solid #333' }}>
                  <TextField
                    fullWidth
                    placeholder="Type your reply..."
                    variant="outlined"
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    disabled={activeContact.status === "Closed" || sending}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton 
                            onClick={handleSendReply} 
                            disabled={!replyMessage.trim() || activeContact.status === "Closed" || sending}
                            color="primary"
                          >
                            {sending ? <CircularProgress size={24} /> : <SendIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendReply();
                      }
                    }}
                  />
                  {activeContact.status === "Closed" && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                      This request is closed. Reopen it to send messages.
                    </Typography>
                  )}
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <ChatIcon sx={{ fontSize: 60, color: '#424242', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Select a contact to view conversation
                  </Typography>
                </Box>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
  );
};

export default ContactUsPage;